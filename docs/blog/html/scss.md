# SCSS 常见用法

## 样式继承 @extend

将一个选择器下的所有样式继承给另一个选择器，注意，后定义的样式享有优先权

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

可以搭配 `%` 占位符使用，用于定义一个样式，但不会将其编译到 `CSS` 中，而是在需要的地方使用 `@extend` 引用。

```scss
%clearfix {
  &::after {
    content: "";
    display: table;
    clear: both;
  }
}

.container {
  @extend %clearfix;
}
```

## 插值语句 #{}

通过 `#{}` 插值语句可以在选择器或属性名中使用变量：

```scss
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: blue;
}

// 编译后
p.foo {
  border-color: blue;
}
```

## 颜色值计算

颜色值的运算是分段计算进行的，也就是分别计算红色，绿色，以及蓝色的值：

```scss
p {
  color: #010203 + #040506;
}

// 编译后
p {
  color: #050709;
}
```

## & 运算符

就像在选择器中使用时一样，`SassScript` 中的 `&` 指的是当前的父选择器。

```scss
@mixin does-parent-exist {
  @if & {
    &:hover {
      color: red;
    }
  } @else {
    a {
      color: red;
    }
  }
}
```

## @if

当 `@if` 的表达式返回值不是 `false` 或者 `null` 时，条件成立，输出 `{}` 内的代码：

```scss
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```

## @for 循环

`for` 循环有两种写法：`@for $var from <start> through <end>`， `@for $var from <start> to <end>`。前者是包含 `<end>` 而后者不包含 `<end>`

```scss
@for $i from 1 through 3 {
  .item-#{$i} {
    width: 2em * $i;
  }
}

// 编译后
.item-1 {
  width: 2em;
}
.item-2 {
  width: 4em;
}
.item-3 {
  width: 6em;
}
```

## @each 遍历

`@each` 指令的格式是 `$var in <list>`，将变量 `$var` 作用于值列表中的每一个项目，然后输出结果

```scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url("/images/#{$animal}.png");
  }
}

// 编译后
.puma-icon {
  background-image: url("/images/puma.png");
}
.sea-slug-icon {
  background-image: url("/images/sea-slug.png");
}
.egret-icon {
  background-image: url("/images/egret.png");
}
.salamander-icon {
  background-image: url("/images/salamander.png");
}
```

## @while

重复输出格式直到表达式返回结果为 `false`

```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} {
    width: 2em * $i;
  }
  $i: $i - 2;
}
```

## 函数指令 function

支持自定义函数，并能在任何属性值或 `Sass script` 中使用

```scss
$grid-width: 40px;
$gutter-width: 10px;

@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}

#sidebar {
  width: grid-width(5);
}
```

## 常用 scss 内置函数

- `mix(color1, color2, [$weight])` 按照 `$weight` 的百分比，返回 `color1` 和 `color2` 混合一起的颜色
- `random()` 获取随机数
- `min($number...)` 获取最小值
- `max($number...)` 获取最大值
- `percentage($number)` 转换成百分比
