import useDomains from "./hooks/useDomains"

const App = () => {
  const {data: domains} = useDomains()
  return (
    <ul>
      {domains?.map(domain => <li key={domain.id} >{domain.domain}</li>)}
    </ul>
  )
}

export default App