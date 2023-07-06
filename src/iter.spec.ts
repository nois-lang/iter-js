import { arrIter, count, filter, first, last, map, toArr } from './iter'

describe('iter', () => {

    describe('arrIter', () => {
        it('arr', () => {
            const iter = arrIter([1, 2, 3])
            expect(iter).toBeTruthy()
        })
    })

    describe('toArr', () => {
        it('arr', () => {
            const iter = arrIter([1, 2, 3])
            expect(toArr(iter)).toEqual([1, 2, 3])
        })

        it('empty', () => {
            const iter = arrIter([])
            expect(toArr(iter)).toEqual([])
        })
    })

    describe('count', () => {
        it('arr', () => {
            const iter = arrIter([1, 2, 3])
            expect(count(iter)).toEqual(3)
            expect(count(iter)).toEqual(0)
        })

        it('empty', () => {
            const iter = arrIter([])
            expect(count(iter)).toEqual(0)
            expect(count(iter)).toEqual(0)
        })
    })

    describe('first', () => {
        it('arr', () => {
            const iter = arrIter([1, 2, 3])
            expect(first(iter)).toEqual({ value: 1 })
            expect(first(iter)).toEqual({ value: 2 })
        })

        it('empty', () => {
            const iter = arrIter([])
            expect(first(iter)).toEqual({})
            expect(first(iter)).toEqual({})
        })
    })

    describe('last', () => {
        it('arr', () => {
            const iter = arrIter([1, 2, 3])
            expect(last(iter)).toEqual({ value: 3 })
            expect(last(iter)).toEqual({})
        })

        it('empty', () => {
            const iter = arrIter([])
            expect(last(iter)).toEqual({})
            expect(last(iter)).toEqual({})
        })
    })

    describe('map', () => {
        it('arr', () => {
            const iter = arrIter([1, 2, 3])
            const mapIter = map(iter, i => i * 2)
            expect(toArr(mapIter)).toEqual([2, 4, 6])
            expect(toArr(mapIter)).toEqual([])
        })

        it('empty', () => {
            const iter = arrIter([])
            const mapIter = map(iter, i => i * 2)
            expect(toArr(mapIter)).toEqual([])
            expect(toArr(mapIter)).toEqual([])
        })
    })

    describe('filter', () => {
        it('arr', () => {
            const iter = arrIter([1, 2, 3])
            const filterIter = filter(iter, i => i % 2 === 1)
            expect(toArr(filterIter)).toEqual([1, 3])
            expect(toArr(filterIter)).toEqual([])
        })

        it('empty', () => {
            const iter = arrIter([])
            const filterIter = filter(iter, i => i % 2 === 1)
            expect(toArr(filterIter)).toEqual([])
            expect(toArr(filterIter)).toEqual([])
        })
    })

})
