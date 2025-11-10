export function getKeyName(...args: string[]) {
  return `paymaster:${args.join(':')}`
}

export function projectKeyById(id: string) {
  return getKeyName('projects', id);
}
