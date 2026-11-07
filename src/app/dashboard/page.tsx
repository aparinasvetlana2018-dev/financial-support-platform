import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="container">
      <div className="card">
        <h1>Личный кабинет</h1>
        <p>Введите ID участника, чтобы открыть доступ к обучению.</p>
        <form>
          <input className="input" placeholder="ID участника" required />
          <button className="button" type="submit">Открыть доступ</button>
        </form>
        <div className="nav">
          <Link href="/">На главную</Link>
        </div>
      </div>
    </main>
  );
}