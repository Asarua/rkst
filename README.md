# rkst

一个基于ts的http请求库

## 功能

- 提供了完善的ts类型支持，支持传入返回类型
- 使用Promise
- 支持两种自定义`before`、`after`拦截
- 支持预配置的高级模式
- 支持开箱即用的简单模式

## 下载

使用npm

```bash
npm install rkst
```

使用yarn

```bash
yarn add rkst
```

## 例子

> 使用`configureRkst`配置拦截器

```typescript
import { configureRkst, ConfigureRkst } from 'rkst'

const before: ConfigureRkst['before'] = options => {
  console.log(options, 'before')
  return options
}

const after: ConfigureRkst['after'] = options => {
  console.log(options, 'after')
  return options
}

const rkst = configureRkst({
  before,
  after
})

export default {
  get(url) {
    return rkst({
      url,
      methods: 'get'
    })
  }
}
```

> 使用`rkst`直接请求

```typescript
import rkst from 'rkst'

export default {
  get(url) {
    return rkst({
      url,
      methods: 'get'
    }, before, after)
  }
}
```

> 通过泛型传递返回参数

```typescript
rkst<{ a: 1 }>({
  url,
  methods: 'get'
})
  .then(data => {
    // data的type === { a: 1 }
  })
```

> 通过封装泛型统一处理类型（rkst的返回类型会自动匹配get的返回类型，因此不用传参也可以完美的类型推倒）

```typescript
interface API {
  get: {
    'https://api.apiopen.top/searchAuthors?name=李白': {
      name: 123
    }
  }
}

export const get = <URL extends keyof API['get']>(url: URL): Promise<API['get'][URL]> => {
  return rkst({
    url,
    methods: 'get'
  })
}

```

## License

[`MIT`](https://github.com/Asarua/rkst/LICENSE)

## Keywords

`xhr` `http` `ajax` `promise`
