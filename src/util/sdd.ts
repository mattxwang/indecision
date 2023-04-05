export type SddSink = 'True' | 'False'

export type SddNode = SddSink | SddLiteral | SddPtr

export type SddLiteral = {
  Literal: {
    label: number
    polarity: boolean
  }
}

export type SddPtr = {
  Ptr: {
    index: number
    compl: boolean
  }
}

export type SddAnd = {
  prime: SddNode
  sub: SddNode
}

export type SddOr = SddAnd[]

export type SddWrapper = {
  nodes: SddOr[]
  roots: SddPtr[]
}
