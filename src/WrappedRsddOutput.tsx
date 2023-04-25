type Props = {
  generator: () => JSX.Element
}

export default function WrappedRsddOutput({ generator }: Props): JSX.Element {
  try {
    return generator()
  } catch (e) {
    const errorMessage =
      typeof e === 'string' ? (
        <>{e}</>
      ) : e instanceof Error ? (
        <>
          <b>{e.name}</b>: {e.message}
        </>
      ) : (
        <>unrecoverable error</>
      )
    return (
      <div className="mt-4">
        <h2 className="text-xl underline">rsdd error!</h2> <p>{errorMessage}</p>
      </div>
    )
  }
}
