/** 判断传入的值，是否带有单位，如果没有，就默认用rpx单位 */
export const getUnitValue = (val: string, unit = 'rpx') => {
  if (/(%|px|rpx|auto|vw|vh|em|rem)$/.test(val)) return val
  else return val + unit
}

/** 转换对象为字符串参数值 */
export const convertQueryToString = <T extends object>(params: T, suffix = '&') => {
  const queryArray: string[] = []
  for (const key in params) {
    const value = params[key]
    if (typeof value !== 'undefined') {
      queryArray.push(`${key}=${value?.toString()}`)
    }
  }
  return queryArray.join(suffix)
}

/** 获取值类型 */
export const getValueType = (value: any): string =>
  Object.prototype.toString
    .call(value)
    .replace(/^\[object\s(.+)\]$/, '$1')
    .toLowerCase()

/** 判断是否为空 */
export const isEmptyValue = (value: any) => {
  if (value === undefined || value === null) {
    return true
  }
  if (typeof value === 'string' && !value) {
    return true
  }
  if (Array.isArray(value) && !value.length) {
    return true
  }
  if (getValueType(value) === 'object' && !Object.keys(value).length) {
    return true
  }
  return false
}

/** 通用树形数据递归调用 */
export const loopTree = <T>(
  treeData: T[],
  iterate: (item: T) => void | boolean,
  childrenKey: keyof T = 'children' as keyof T,
) => {
  for (const item of treeData) {
    if (iterate(item) === false) {
      break
    }
    if ((item[childrenKey] as unknown as T[])?.length) {
      loopTree(item[childrenKey] as unknown as T[], iterate, childrenKey)
    }
  }
}

/** 空函数 */
export const noop: (...args: any[]) => any = () => {}

/** 延迟 */
export const delay = (timeout: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

/** 防抖 */
export const debounce = (fn: (...args: any[]) => any, delay = 0) => {
  let t: number | null = null
  return (...innerArgs: any[]) => {
    if (t !== null) {
      clearTimeout(t)
    }
    t = setTimeout(() => {
      fn(...innerArgs)
    }, delay)
  }
}
