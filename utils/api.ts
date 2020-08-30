async function api<T>(
  url: String
): Promise<T> {
  return (await fetch(`api/${url}`)).json()
}

export interface IRoomId {
  roomId: string
}
export function getRoomId() {
  return api<IRoomId>('getRoomId')
}