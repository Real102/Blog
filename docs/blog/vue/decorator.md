# Vue Property Decorator

> 此文的示例都来自 [Vue Property Decorator](https://github.com/kaorun343/vue-property-decorator#vue-property-decorator)，只是增加了一些自己的理解，作为基础学习文档

主要罗列一下 `vue` 装饰器的常用方法。官方文档共有以下装饰器/Mixin

- `@Prop`
- `@PropSync`
- `@Model`
- `@ModelSync`
- `@Watch`
- `@Provide`
- `@Inject`
- `@ProvideReactive`
- `@InjectReactive`
- `@Emit`
- `@Ref`
- `@VModel`
- `@Component (provided by vue-class-component)`
- `Mixins (the helper function named mixins provided by vue-class-component)`

如何使用：

`Vue Property Decorator` 主要用于 `vue2.x + ts`。创建 `vue` 项目的时候，选择 `class-style component syntax`，就会默认安装好 `vue-class-component` 和 `vue-property-decorator`

## @Prop

语法：`@Prop(options: (PropOptions | Constructor[] | Constructor) = {})`，不用特意去记，跟原 `Props` 的参数基本一致，只是写法稍微变了一点

```javascript
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  @Prop(Number) readonly propA: number | undefined
  @Prop({ default: 'default value' }) readonly propB!: string
  @Prop([String, Boolean]) readonly propC: string | boolean | undefined
}

// 注意不能直接用下面的方式去定义默认值
@Prop() prop = 'default value' // ×
```

对应的源代码为：

```javascript
export default {
  props: {
    propA: {
      type: Number
    },
    propB: {
      default: "default value"
    },
    propC: {
      type: [String, Boolean]
    }
  }
}
```

## @PropSync

语法：`@PropSync(propName: string, options: (PropOptions | Constructor[] | Constructor) = {})`，跟 `vue2` 中的 `.sync` 修饰符实现的效果类似，但是不太建议使用这种方式，会破坏 `vue` 组件单向数据流的设定

```javascript
import { Vue, Component, PropSync } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  @PropSync('name', { type: String }) syncedName!: string
}
```

对应的源代码为：

```javascript
export default {
  props: {
    name: {
      type: String
    }
  },
  computed: {
    syncedName: {
      get() {
        return this.name
      },
      set(value) {
        this.$emit("update:name", value)
      }
    }
  }
}
```

如上，在父组件传递一个 `name` 参数，在子组件，`@PropSync` 定义了一个计算属性 `syncedName`，并且设置了 `setter` 和 `getter`，在访问 `syncedName` 时，返回父组件传递过来的 `name` 值，在设置 `syncedName` 时，`emit` 一个更新事件给父组件。而在父组件，也只需要用 `.sync` 修饰符：`<parentComponent :name.sync="name"></parentComponent>`。后续也只需要在子组件操作 `syncedName` 变量即可与父组件的变量 `name` 同步

## @Model

语法：`@Model(event?: string, options: (PropOptions | Constructor[] | Constructor) = {})`。先看代码

```javascript
import { Vue, Component, Model } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  @Model('change', { type: Boolean }) readonly checked!: boolean
}

// 不要忘了同步数据时需要 $emit 一下，事件对应@Model中的事件
syncValue(): void {
  this.$emit('change', someValue)
}
```

对应的源代码为：

```javascript
export default {
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    checked: {
      type: Boolean
    }
  }
}
```

`@Model` 这一项对应的是：在组件中使用 `v-model` 中的 `model` 选项

一般情况下，`v-model` 会默认利用名为 `value` 的 `prop` 和名为 `input` 的事件（最常用）。但对于单选框、复选框这种输入控件，便不太符合场景。因此就有了 `model` 选项。具体示例可以看下上面的源代码，或更为详细的 `vue` 官方文档：[自定义组件的 v-model](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)

通过 `Model` 选项，我们可以自定义地修改子组件接收的 `prop`（如上源代码中的 `checked` 变量），并且修改触发的事件（如上源码中的 `input` 事件修改为 `change`），这样就可以自由控制什么时候将数据“同步”给父组件

## @ModelSync

语法：`@ModelSync(propName: string, event?: string, options: (PropOptions | Constructor[] | Constructor) = {})`，与 `@Model` 想比较之下，`@ModelSync` 会自动 `$emit` 对应事件给父组件，使用起来应该会更舒服一些。不过说实话，基本没咋用过 `model` 选项 em...

```javascript
import { Vue, Component, ModelSync } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  @ModelSync('checked', 'change', { type: Boolean })
  readonly checkedValue!: boolean
}

// 现在修改 checkedValue 会自动 $emit 给父组件
```

对应的源代码为：

```javascript
export default {
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    checked: {
      type: Boolean
    }
  },
  computed: {
    checkedValue: {
      get() {
        return this.checked
      },
      set(value) {
        this.$emit("change", value)
      }
    }
  }
}
```

## @Watch

语法：`@Watch(path: string, options: WatchOptions = {})`，也就是监听器 `watch`，基本都一样了，稍微熟悉一下即可

```javascript
import { Vue, Component, Watch } from "vue-property-decorator"

@Component
export default class YourComponent extends Vue {
  @Watch("child") //修饰符
  onChildChanged(val: string, oldVal: string) {} //对应方法

  @Watch("person", { immediate: true, deep: true })
  onPersonChanged1(val: Person, oldVal: Person) {}

  @Watch("person")
  onPersonChanged2(val: Person, oldVal: Person) {}

  @Watch("person")
  @Watch("child")
  onPersonAndChildChanged() {}
}
```

对应的源代码为：

```javascript
export default {
  watch: {
    child: [
      {
        handler: "onChildChanged",
        immediate: false,
        deep: false
      },
      {
        handler: "onPersonAndChildChanged",
        immediate: false,
        deep: false
      }
    ],
    person: [
      {
        handler: "onPersonChanged1",
        immediate: true,
        deep: true
      },
      {
        handler: "onPersonChanged2",
        immediate: false,
        deep: false
      },
      {
        handler: "onPersonAndChildChanged",
        immediate: false,
        deep: false
      }
    ]
  },
  methods: {
    onChildChanged(val, oldVal) {},
    onPersonChanged1(val, oldVal) {},
    onPersonChanged2(val, oldVal) {},
    onPersonAndChildChanged() {}
  }
}
```

## @Provide、@Inject

语法：`@Provide(key?: string | symbol) / @Inject(options?: { from?: InjectKey, default?: any } | InjectKey)`，先看代码

```javascript
import { Component, Inject, Provide, Vue } from 'vue-property-decorator'

const symbol = Symbol('baz')

@Component
export class MyComponent extends Vue {
  @Inject() readonly foo!: string
  @Inject('bar') readonly bar!: string
  @Inject({ from: 'optional', default: 'default' }) readonly optional!: string
  @Inject(symbol) readonly baz!: string

  @Provide() foo = 'foo'
  @Provide('bar') baz = 'bar'
}
```

对应的源代码为：

```javascript
const symbol = Symbol("baz")

export const MyComponent = Vue.extend({
  inject: {
    foo: "foo",
    bar: "bar",
    optional: { from: "optional", default: "default" },
    baz: symbol
  },
  data() {
    return {
      foo: "foo",
      baz: "bar"
    }
  },
  provide() {
    return {
      foo: this.foo,
      bar: this.baz
    }
  }
})
```

在 `vue2.x` 中，于本人来说 `Provide/Inject` 用的是相对比较少的，一方面不会使用层级过深的组件，另一方面 `Provide/Inject` 也具有其一定的缺陷：[依赖注入](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5)；在 `vue3.x` 中，可以用来全局注入，如 `vue2.x` 中的 `Vue.prototype`（`vue3.x` 中已被废除，`Provide/Inject` 作为替代方案：[查看文档](https://v3.cn.vuejs.org/guide/migration/global-api.html#vue-prototype-%E6%9B%BF%E6%8D%A2%E4%B8%BA-config-globalproperties)）

## @Emit

语法：`@Emit(event?: string)`，直接看代码，熟悉熟悉就可以上手的了

```javascript
import { Vue, Component, Emit } from "vue-property-decorator"

@Component
export default class YourComponent extends Vue {
  count = 0

  @Emit()
  addToCount(n: number) {
    this.count += n
  }

  @Emit("reset")
  resetCount() {
    this.count = 0
  }

  @Emit()
  returnValue() {
    return 10
  }

  @Emit()
  onInputChange(e) {
    return e.target.value
  }

  @Emit()
  promise() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(20)
      }, 0)
    })
  }
}
```

对应的源代码为：

```javascript
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    addToCount(n) {
      this.count += n
      this.$emit("add-to-count", n)
    },
    resetCount() {
      this.count = 0
      this.$emit("reset")
    },
    returnValue() {
      this.$emit("return-value", 10)
    },
    onInputChange(e) {
      this.$emit("on-input-change", e.target.value, e)
    },
    promise() {
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve(20)
        }, 0)
      })

      promise.then(value => {
        this.$emit("promise", value)
      })
    }
  }
}
```

## Vuex-Class

`vuex` 也有对应的装饰器，用起来比较舒服，不用写那么长的代码了：`this.$store.state.user.userInfo`...

官网地址：[vuex-class](https://github.com/ktsn/vuex-class/)

```javascript
import Vue from "vue"
import Component from "vue-class-component"
import { State, Getter, Action, Mutation, namespace } from "vuex-class"

const someModule = namespace("path/to/module")

@Component
export class MyComp extends Vue {
  @State("foo") stateFoo
  @State(state => state.bar) stateBar
  @Getter("foo") getterFoo
  @Action("foo") actionFoo
  @Mutation("foo") mutationFoo
  @someModule.Getter("foo") moduleGetterFoo

  // If the argument is omitted, use the property name
  // for each state/getter/action/mutation type
  @State foo
  @Getter bar
  @Action baz
  @Mutation qux

  created() {
    this.stateFoo // -> store.state.foo
    this.stateBar // -> store.state.bar
    this.getterFoo // -> store.getters.foo
    this.actionFoo({ value: true }) // -> store.dispatch('foo', { value: true })
    this.mutationFoo({ value: true }) // -> store.commit('foo', { value: true })
    this.moduleGetterFoo // -> store.getters['path/to/module/foo']
  }
}
```

总结一下：装逼利器，不用白不用
