import { ListStructure } from "./ListStructure";
import { Queue } from "./Queue";
import { Stack } from "./Stack";

// Mantemos as instâncias com os nomes que você já utiliza
// O uso de 'any' ou 'unknown' permite que as estruturas aceitem qualquer tipo de dado
export const stack = new Stack<any>("Pilha Principal");
export const queue = new Queue<any>("Fila Principal");
export const list = new ListStructure<any>("Lista Principal");