// Это не совсем требовалось, но я понимаю, что в будущем возможно появятся разные реализации, но с этой же фукнцией выбора.
export interface IItemState<T> {
    selected: Set<T>;
    stepsOrder: Array<[number, number]>;
}
