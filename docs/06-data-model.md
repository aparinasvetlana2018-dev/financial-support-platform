# Модель данных MVP

## Основные сущности

### User

Представляет любого зарегистрированного человека.

| Поле | Тип | Описание |
|---|---|---|
| id | UUID | Внутренний идентификатор |
| participant_id | string | Публичный ID участника, выдаваемый после собеседования |
| email | string | E-mail для входа и уведомлений |
| password_hash | string | Хеш пароля |
| full_name | string | Имя участника |
| phone | string | Телефон, если указан |
| role | enum | guest, student, mentor, admin |
| status | enum | pending, candidate, active, completed, blocked |
| created_at | datetime | Дата регистрации |

### Group

Учебная группа или поток.

| Поле | Тип | Описание |
|---|---|---|
| id | UUID | Идентификатор группы |
| name | string | Название группы |
| cohort | string | Поток, при необходимости |
| status | enum | draft, active, completed, archived |
| created_by | UUID | Модератор, создавший группу |
| created_at | datetime | Дата создания |

### Membership

Связывает пользователя и группу, а также фиксирует роль в конкретной группе.

| Поле | Тип | Описание |
|---|---|---|
| id | UUID | Идентификатор связи |
| user_id | UUID | Пользователь |
| group_id | UUID | Группа |
| role_in_group | enum | student, mentor, expert, psychologist |
| joined_at | datetime | Дата добавления |
| status | enum | active, removed, completed |

### ChatMessage

Сообщение в общем чате группы.

| Поле | Тип | Описание |
|---|---|---|
| id | UUID | Идентификатор сообщения |
| group_id | UUID | Группа |
| author_id | UUID | Автор |
| text | text | Текст сообщения |
| attachment_id | UUID | Прикреплённый файл, если есть |
| is_pinned | boolean | Закреплено ли сообщение |
| created_at | datetime | Время отправки |

### Forum и ForumTopic

Форум — пространство наставника или эксперта; тема — отдельное обсуждение.

| Поле Forum | Тип | Описание |
|---|---|---|
| id | UUID | Идентификатор форума |
| owner_id | UUID | Наставник или эксперт |
| group_id | UUID | Связанная группа |
| title | string | Название форума |
| visibility | enum | group, public_limited |

| Поле ForumTopic | Тип | Описание |
|---|---|---|
| id | UUID | Идентификатор темы |
| forum_id | UUID | Форум |
| author_id | UUID | Автор темы |
| title | string | Заголовок |
| body | text | Содержание |
| is_pinned | boolean | Закреплена ли тема |
| created_at | datetime | Дата создания |

### Material

Учебный материал, файл, ссылка, видео или тест.

| Поле | Тип | Описание |
|---|---|---|
| id | UUID | Идентификатор материала |
| author_id | UUID | Наставник или админ |
| group_id | UUID | Группа, если материал адресный |
| title | string | Название |
| type | enum | document, video, link, test, article |
| url | string | Ссылка или расположение файла |
| save_to_library | boolean | Сохранять ли в ЛК учеников |
| created_at | datetime | Дата публикации |

### Assignment и Submission

Домашнее задание и ответ ученика.

| Поле Assignment | Тип | Описание |
|---|---|---|
| id | UUID | Идентификатор ДЗ |
| group_id | UUID | Группа |
| author_id | UUID | Наставник, задавший работу |
| title | string | Название |
| description | text | Условие |
| due_at | datetime | Срок сдачи |
| created_at | datetime | Дата публикации |

| Поле Submission | Тип | Описание |
|---|---|---|
| id | UUID | Идентификатор сдачи |
| assignment_id | UUID | Задание |
| student_id | UUID | Ученик |
| content | text | Текстовый ответ |
| attachment_id | UUID | Файл, если есть |
| status | enum | draft, submitted, reviewed, overdue |
| score | integer | Оценка |
| feedback | text | Комментарий наставника |
| submitted_at | datetime | Дата сдачи |
| reviewed_at | datetime | Дата проверки |

### Report

Регулярный отчёт о прогрессе.

| Поле | Тип | Описание |
|---|---|---|
| id | UUID | Идентификатор отчёта |
| student_id | UUID | Ученик |
| group_id | UUID | Группа |
| period | date | Период отчёта |
| content | text | Ответы и прогресс |
| submitted_at | datetime | Время отправки |
| status | enum | draft, submitted, late |

### ScheduleEvent

Занятие или событие в расписании.

| Поле | Тип | Описание |
|---|---|---|
| id | UUID | Идентификатор события |
| group_id | UUID | Группа |
| title | string | Название |
| starts_at | datetime | Начало |
| ends_at | datetime | Окончание |
| meeting_url | string | Ссылка на встречу |
| created_by | UUID | Модератор |

## Ключевые связи

- `User` может иметь несколько `Membership` — в разных группах и с разными ролями.
- `Group` содержит участников, чат, форумы, материалы, ДЗ, отчёты и события расписания.
- `Assignment` принадлежит группе и автору-наставнику; `Submission` связывает задание и ученика.
- `Material` может публиковаться в группе, форуме или чате и сохраняться в личной библиотеке ученика.
- `Report` привязан к ученику и группе, но имеет собственный период.

## Важные правила

- Роль пользователя глобально и роль в конкретной группе могут различаться.
- Проверять и оценивать ДЗ может только его автор-наставник.
- Удаление участника из группы не удаляет его историю ДЗ, отчётов и материалов.
- ID участника постоянный и не должен меняться при смене группы или роли.