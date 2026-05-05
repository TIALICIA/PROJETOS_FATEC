import { ILinearStructure } from "./interfaces/ILinearStructure";

export abstract class LinearStructure<T> implements ILinearStructure<T> {
  private static createdStructures = 0;

  private readonly id: number;
  protected items: T[] = [];
  public readonly name: string;

  protected constructor(name: string) {
    this.name = name;
    LinearStructure.createdStructures += 1;
    this.id = LinearStructure.createdStructures;
  }

  public add(item: T): void {
    this.items.push(item);
  }

  public abstract remove(): T | undefined;

  public abstract peek(): T | undefined;

  public getItems(): T[] {
    return [...this.items];
  }

  public getSize(): number {
    return this.items.length;
  }

  public clear(): void {
    this.items = [];
  }

  public getId(): number {
    return this.id;
  }

  public static getCreatedStructures(): number {
    return LinearStructure.createdStructures;
  }
}
