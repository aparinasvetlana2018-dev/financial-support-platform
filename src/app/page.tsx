import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <div className="card">
        <h1>Своя финансовая опора</h1>
        <p>
          Образовательная платформа для людей, оказавшихся в сложной финансовой или жизненной ситуации. Здесь будут материалы специалистов, поддержка наставников, домашние задания и личный прогресс.
        </p>
        <div className="nav">
          <Link className="button" href="/register">Подать заявку</Link>
          <Link href="/login">Войти</Link>
        </div>
      </div>
    </main>
  );
}