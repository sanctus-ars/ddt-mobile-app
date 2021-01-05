import { mergeMap } from 'rxjs/operators';
import { Observable, throwError, timer } from 'rxjs';

import { RetryStrategyModel, AnswerModel } from '../models';

export const genericRetryStrategy =
	(errors: Observable<AnswerModel>, data: RetryStrategyModel = new RetryStrategyModel()): Observable<AnswerModel | number> => {
		return errors.pipe(
			mergeMap((error: AnswerModel, i: number) => {
				const retryCounter = i + 1;
				if (retryCounter > data.maxRetry) {
					return throwError(error);
				}
				console.log(`${retryCounter}: retrying in ${retryCounter * data.duration}ms`);
				return timer(retryCounter * data.duration);
			})
		);
	};
