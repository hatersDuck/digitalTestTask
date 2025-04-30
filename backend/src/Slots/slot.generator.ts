import { Slot } from "../model/slot";

export class SlotGenerator {
    private static readonly TITLES_VERB = [
        "Сделать", "Доделать", "Начать", "Закончить", 
        "Оптимизировать", "Рефакторить", "Протестировать", "Исправить"
    ];
    
    private static readonly TITLES_SUBJECT = [
        "компонент", "страницу", "модуль", "функцию", 
        "API", "базу данных", "интерфейс", "алгоритм"
    ];
    
    private static readonly TITLES_DESCRIPTION = [
        "для клиента", "в системе", "в админке", "срочно", 
        "до релиза", "по ТЗ", "с анимацией", "с валидацией"
    ];

    static generate(count: number): Slot[] {
        return Array.from({ length: count }, (_, i) => this.generateSlot(i + 1));
    }

    private static generateSlot(id: number): Slot {
        return {
            id,
            title: this.generateRandomTitle(),
        };
    }

    private static generateRandomTitle(): string {
        return [
            this.getRandomElement(this.TITLES_VERB),
            this.getRandomElement(this.TITLES_SUBJECT),
            this.getRandomElement(this.TITLES_DESCRIPTION)
        ].join(' ');
    }

    private static getRandomElement(array: string[]): string {
        return array[Math.floor(Math.random() * array.length)];
    }
}