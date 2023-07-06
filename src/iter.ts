import { Option } from './option'

export interface Iter<T> {
    next(): Option<T>
}

export const count = <T>(iter: Iter<T>): number => {
    let c = 0
    while ('value' in iter.next()) {
        c++
    }
    return c
}

export const first = <T>(iter: Iter<T>): Option<T> => {
    return iter.next()
}

export const last = <T>(iter: Iter<T>): Option<T> => {
    let last = {}
    while (true) {
        const n = iter.next()
        if ('value' in n) {
            last = n
        } else {
            return last
        }
    }
}

export class MapIter<T, U> implements Iter<U> {

    iter: Iter<T>
    f: (item: T) => U

    constructor(iter: Iter<T>, f: (item: T) => U) {
        this.iter = iter
        this.f = f
    }

    next(): Option<U> {
        const n = this.iter.next()
        if ('value' in n) {
            return { value: this.f(n.value) }
        } else {
            return {}
        }
    }

}

export const map = <T, U>(iter: Iter<T>, f: (item: T) => U): Iter<U> => {
    return new MapIter(iter, f)
}

export class FilterIter<T, U> implements Iter<U> {

    iter: Iter<T>
    f: (item: T) => boolean

    constructor(iter: Iter<T>, f: (item: T) => boolean) {
        this.iter = iter
        this.f = f
    }

    next(): Option<U> {
        while (true) {
            const n = this.iter.next()
            if (!('value' in n)) return {}

            if (this.f(n.value)) {
                return { value: n.value }
            }
        }
    }

}

export const filter = <T>(iter: Iter<T>, f: (item: T) => boolean): Iter<T> => {
    return new FilterIter(iter, f)
}

export class ArrIter<T> implements Iter<T> {

    arr: T[]
    index: number = 0

    constructor(arr: T[]) {
        this.arr = arr
    }

    next(): Option<T> {
        if (this.index < this.arr.length) {
            let item = { value: this.arr[this.index] }
            this.index++
            return item
        } else {
            return {}
        }
    }

}

export const arrIter = <T>(arr: T[]): Iter<T> => {
    return new ArrIter(arr)
}

export const toArr = <T>(iter: Iter<T>): T[] => {
    const arr = []
    while (true) {
        const n = iter.next()
        if ('value' in n) {
            arr.push(n.value)
        } else {
            return arr
        }
    }
}
