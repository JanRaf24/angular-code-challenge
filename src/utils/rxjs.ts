import { delay, MonoTypeOperatorFunction } from 'rxjs';

export function randomDelay<T>(
  minDelay = 100,
  maxDelay = 300
): MonoTypeOperatorFunction<T> {
  return delay(minDelay + Math.random() * (maxDelay - minDelay));
}
