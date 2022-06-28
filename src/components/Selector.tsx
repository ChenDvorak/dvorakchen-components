import {
  useMemo,
  useReducer,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SelectHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  MutableRefObject,
  KeyboardEvent,
} from "react";
import { useOutsideClick } from "~/hooks";

import { KeyValue } from "~/types";
import { Selector as SelectorIcon, Checkmark as CheckmarkIcon } from "~/icons";
import { getThemeColor } from "~/theme";

type DvorakSelectorAttribute = {
  onChange?: (option: KeyValue) => void;
  dataSource: KeyValue[];
  placeholder?: string;
  defaultValue?: KeyValue;
};

type SelectorButton = { placeholder?: string; text?: string };

type StateDefine = {
  /**
   * button element
   */
  buttonRef: MutableRefObject<HTMLButtonElement | null>;
  /**
   * list element
   */
  listRef: MutableRefObject<HTMLSpanElement | null>;
  /**
   * weather list open or close
   */
  open: boolean;
  /**
   * selected item or null
   */
  selected: KeyValue | null;
  allItems: KeyValue[];
  defaultItem?: KeyValue;
  /**
   * dispatch associated with current state
   */
  dispatch?: Dispatch<Action>;
  onChange?: (option: KeyValue) => void;
};

type Action = {
  type: "trigger" | "selected" | "close";
  selected?: KeyValue | null;
  autoClose?: boolean;
};

function reducer(state: StateDefine, action: Action): StateDefine {
  switch (action.type) {
    case "trigger":
      return { ...state, open: !state.open };
    case "close":
      return { ...state, open: false };
    case "selected": {
      if (!action.selected) {
        throw new Error(`selected item not found`);
      }
      state.onChange?.(action.selected);
      return {
        ...state,
        selected: action.selected,
        open: action.autoClose ? false : state.open,
      };
    }
    default:
      throw new Error(`unkwon action.type: ${action.type}`);
  }
}

const SelectorContext = createContext<StateDefine | null>(null);

const useSelectorContext = (): StateDefine => {
  const ctx = useContext(SelectorContext);
  if (ctx === null) {
    throw new Error("context is null");
  }
  return ctx;
};

export function Selector(
  props: Omit<SelectHTMLAttributes<HTMLSelectElement>, "defaultValue"> &
    DvorakSelectorAttribute
) {
  const dataSource = props.dataSource;
  const initState: StateDefine = {
    buttonRef: useRef(null),
    listRef: useRef(null),
    open: false,
    selected: null,
    allItems: dataSource,
    defaultItem: props.defaultValue,
    onChange: props.onChange,
  };

  const [state, dispatch] = useReducer(reducer, initState);
  state.dispatch = dispatch;

  useOutsideClick([state.buttonRef, state.listRef], () => {
    dispatch({ type: "close" });
  });

  //  set default value is exist
  useEffect(() => {
    if (state.defaultItem && !state.selected) {
      state.dispatch?.({ type: "selected", selected: state.defaultItem });
    }
  }, []);

  const placeholder = useMemo(
    () => props.placeholder ?? "",
    [props.placeholder]
  );

  return (
    <span role="list" className="inline-flex flex-col w-40 p-1 space-y-1">
      <SelectorContext.Provider value={state}>
        <SelectorButton
          placeholder={placeholder}
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: "trigger" });
          }}
        />
        {state.open && <Items dataSource={dataSource} />}
      </SelectorContext.Provider>
    </span>
  );
}

function SelectorButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const state = useSelectorContext();
  const theme = getThemeColor("general");

  function handleKeydown(event: KeyboardEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (event.code === "Space") {
      state.dispatch?.({ type: "trigger" });
      return;
    }
    if (!state.open) {
      return;
    }
    let nextSelect: KeyValue | null = null;
    switch (event.code) {
      case "ArrowUp":
        nextSelect = getNext("up");
        break;
      case "ArrowDown":
        nextSelect = getNext("down");
        break;
    }

    if (nextSelect) {
      state.dispatch?.({ type: "selected", selected: nextSelect });
    }

    function getNext(direction: "up" | "down") {
      const flag = direction === "up" ? -1 : 1;
      return state.selected === null
        ? state.allItems[0]
        : state.allItems[
            Math.abs(state.allItems.indexOf(state.selected) + flag) %
              state.allItems.length
          ];
    }
  }

  return (
    <button
      ref={state.buttonRef}
      type="button"
      title={state.selected?.value}
      className={`inline-flex items-center min-h-[1rem]
      border rounded-lg ${theme.border} shadow py-0.5 outline-none
      ${theme.text} ${theme.color} space-x-1 focus:ring-offset-2 focus:ring-1 ${theme.focusRing}`}
      onClick={props.onClick}
      onKeyDown={handleKeydown}
      tabIndex={0}
    >
      <span className="grow text-sm ml-2 w-full whitespace-nowrap overflow-clip">
        {state.selected?.value || props.placeholder}
      </span>
      <SelectorIcon className="w-5 h-5 mr-0.5 stroke-gray-400" />
    </button>
  );
}

function Items(
  props: HTMLAttributes<HTMLSpanElement> & { dataSource: KeyValue[] }
) {
  const { listRef } = useSelectorContext();

  return (
    <span className="relative outline-none" ref={listRef}>
      <span
        className="absolute top-0 left-0 right-0 outline-none
          inline-flex flex-col rounded-lg border border-gray-300 py-2
          shadow"
        role="listbox"
      >
        {props.dataSource.length === 0 && (
          <div className="text-center text-gray-300 tracking-widest">空的</div>
        )}
        {props.dataSource.map((data) => (
          <Item option={data} />
        ))}
      </span>
    </span>
  );
}

function Item(props: { option: KeyValue }) {
  const state = useSelectorContext();
  const primaryTheme = getThemeColor("primary");
  const generalTheme = getThemeColor("general");
  const currentSelected = state.selected?.key === props.option.key;

  const style = useMemo(
    () =>
      currentSelected
        ? `${primaryTheme.color} ${primaryTheme.text}`
        : `${generalTheme.color} ${generalTheme.text}`,
    [currentSelected]
  );

  function handleSelect() {
    state.dispatch?.({ type: "selected", selected: props.option });
  }

  return (
    <div
      className={`flex items-center p-1 cursor-pointer text-sm tracking-wider 
      ${style} ${primaryTheme.hover} hover:text-white space-x-1`}
      role="listitem"
      onClick={handleSelect}
    >
      <CheckmarkIcon
        className={`w-4 h-4
      ${currentSelected ? "opacity-100" : "opacity-0"}`}
      />
      {props.option.value}
    </div>
  );
}
