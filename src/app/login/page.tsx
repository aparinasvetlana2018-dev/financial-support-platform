import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="container">
      <div className="card">
        <h1>Вход</h1>
        <p>Введите e-mail и пароль, затем откройте личный кабинет и введите ID участника.</p>
        <form>
          <input className="input" type="email" placeholder="E-mail" required />
          <input className="input" type="password" placeholder="Пароль" required />
          <button className="button" type="submit">Войти</button>
        </form>
        <p>
          <Link href="/register">Создать аккаунт</Link>
        </p>
      </div>
    </main>
  );
}