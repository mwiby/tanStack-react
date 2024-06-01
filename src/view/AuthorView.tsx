
const AuthorView = () => {

    return (
      <div>
        <h1>Authors</h1>
        <div>
          {status === 'pending' ? (
            'Loading...'
          ) : status === 'error' ? (
            <span>Error: {error.message}</span>
          ) : (
            <>
              <div>
                {data.map((author: { id: number, name: string }) => (
                  <p key={author.id}>
                  <span>{author.name}</span>
                  </p>
                ))}
              </div>
              <div>{isFetching ? 'Background Updating...' : ' '}</div>
            </>
          )}
        </div>
      </div>
    )
  }

  export default AuthorView