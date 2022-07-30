import { clsxm } from '@/lib'

type Option = {
  value: string
  content: string
}

type SelectProps = {
  option: Option[]
  name: string
}

const Select: React.FunctionComponent<SelectProps> = ({ option, name }) => (
  <select
    name={name}
    className={clsxm('w-full', 'rounded-md', 'border-slate-300 focus:ring focus:ring-blue-400')}
  >
    {option.map((o) => (
      <option key={o.value} value={o.value}>
        {o.content}
      </option>
    ))}
  </select>
)

export default Select
