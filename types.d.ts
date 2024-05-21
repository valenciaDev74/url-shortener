export interface IUrlModel{
  save(originalUrl: string, shortUrl: string): Promise<void>
  getOriginal(shortUrl: string): Promise<string|null>
  exist(fields: object): Promise<boolean>
}
