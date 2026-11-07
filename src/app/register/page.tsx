import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="container">
      <div className="card">
        <h1>Регистрация</h1>
        <p>Зарегистрируйтесь, чтобы подать заявку на обучение и получать уведомления.</p>
        <form>
          <input className="input" type="text" placeholder="Имя и фамилия" required />
          <input className="input" type="email" placeholder="E-mail" required />
          <input className="input" type="password" placeholder="Пароль" required />
          <button className="button" type="submit">Зарегистрироваться</button>
        </form>
        <p>
          Уже есть аккаунт? <Link href="/login">Войти</Link>
        </p>
      </div>
    </main>
  );
}