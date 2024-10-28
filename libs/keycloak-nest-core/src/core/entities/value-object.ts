export abstract class ValueObject<T> {
  protected props: T

  protected constructor(props: T) {
    this.props = props
  }

  public equals(vo: ValueObject<unknown>): boolean {
    if (vo === null || vo === undefined) {
      return false
    }

    if (vo.props === undefined) {
      return false
    }

    return JSON.stringify(vo.props) === JSON.stringify(this.props)
  }
}
