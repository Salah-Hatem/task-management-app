import LogoComponent from "../components/logo"

export default function Home() {
  return (
    <>
      <header className="">
        <LogoComponent />
        <p>Manage your tasks with ease</p>
      </header>
      <div>
        <div className="btn-group">
          <button className="btn-primary">Sign in</button>
          <button className="btn-primary">Sign up</button>
        </div>
      </div>
    </>
  )
}
