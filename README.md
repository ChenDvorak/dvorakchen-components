# dvorakchen-components

There are some compenents for React.

Now support:

- Button

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
