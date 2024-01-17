import type { Response } from './response'
export type { Response, Combine, AtLeastOne }

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]
type Combine<Optional, Required> = AtLeastOne<Optional> & Required
