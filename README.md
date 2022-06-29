# dvorakchen-components

There are some compenents for React.

Now support:

- Button
- Input
- CheckBox

Not support:

CHANGE THEME!

I was try to make this components with first Utility-First Fundamentals, like Tailwindcss.

At last, that is not good at making components I thought.

# Installation

```
npm i dvorakchen-components
```

# Usage

## Button

```jsx
import { Button } from "dvorakchen-components";

<Button>Submit</Button>;
```

pass the props to it like primitive button

```jsx
<Button onClick={() => {}}>Submit</Button>
```

select color, pass primary or secondary or nothing

```jsx
<Button primary>Primary Button</Button>
<Button secordary>Secondary Button</Button>
<Button>General Button</Button>
```

## Input

```jsx
import { Input } from "dvorakchen-components";

<Input />;
```

label prefix

```jsx
<Input label="TEXT" />
```

## CheckBox

```jsx
import { CheckBox } from "dvorakchen-components";

<CheckBox>
  <CheckBox.Item label="LABEL_1" defaultChecked defaultValue="ON" />
  <CheckBox.Item label="LABEL_2" defaultValue="OFF" />
</CheckBox>;
```

## Selector

```jsx
import { Selector } from "dvorakchen-components";

const DATA = [
  {
    key: "1111",
    value: "先择",
  },
  {
    key: "1122",
    value: "拜入",
  },
];
const PLACEHOLDER = "未选择";
<Selector dataSource={DATA} placeholder={PLACEHOLDER} />;
```

## RadioGroup

```jsx
import { RadioGroup } from "dvorakchen-components";

const DATA = [
  { key: "1", value: "确认" },
  { key: "2", value: "取消" },
];
function handleChange(item) {}
<RadioGroup dataSource={DATA} onChange={handleChange} />;
```
