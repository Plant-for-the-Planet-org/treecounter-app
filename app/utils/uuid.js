import { v1, v4 } from 'uuid';

export function uuidv1() {
  return v1();
}

export function uuidv4() {
  return v4();
}
