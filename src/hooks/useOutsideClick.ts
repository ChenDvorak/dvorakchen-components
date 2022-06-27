import { useEffect, useCallback } from "react";

type Containers = Contaiter[];
type Contaiter = HTMLElement | React.MutableRefObject<HTMLElement | null>;

export function useOutsideClick(
  containers: Containers,
  event: (e: PointerEvent) => void,
  options?: any
) {
  const callback = useCallback(
    (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (
        containers.some((element: Contaiter) => {
          const node =
            element instanceof HTMLElement ? element : element?.current;
          return node?.contains(target);
        })
      ) {
        return;
      }
      event(e);
    },
    [event]
  );

  useEffect(() => {
    window.removeEventListener("pointerdown", callback, options);
    window.addEventListener("pointerdown", callback, options);
    return () => {
      window.removeEventListener("pointerdown", callback, options);
    };
  }, []);
}
