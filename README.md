# 🌍 freeSocial — Communicate Beyond Language Barriers

free social, social-impact web platform** that allows people to communicate with anyone **without knowing each other’s language**.

The project places a strong emphasis on **local and underrepresented languages**, which are often ignored by mainstream translation tools.

---

## 🎯 Project Mission

LocalLingua aims to:
- Break language barriers worldwide
- Promote and preserve local and indigenous languages
- Enable inclusive and accessible communication
- Provide a free tool with real social impact

Language should never be a barrier to human connection.

---

## ✨ Key Features

- 🔄 Real-time bidirectional translation
- 🗣️ Support for local and underrepresented languages
- 💬 Multilingual messaging system
- 🌐 Modern and responsive web interface
- 🔐 Secure user authentication
- ⚙️ Scalable API-first architecture

---

## 🛠️ Tech Stack

### Backend
- **Laravel** (REST API)
- Authentication (Sanctum / JWT)
- User and message management
- Translation service integration

### Frontend
- **React**
- Axios for API communication
- Responsive and accessible UI
- Optimized state management

### Database & Tools
- MySQL / PostgreSQL
- Git & GitHub
- Docker (optional)

---

## 📁 Project Structure
This is a **single Laravel project** with React integrated inside it:

/app
/resources
/js -> React application
/views
/routes
/database
/public

yaml


---

## ⚙️ Installation & Setup

### Requirements

- PHP ≥ 8.1
- Composer
- Node.js ≥ 18
- npm
- MySQL / PostgreSQL

### Steps

1. Clone the repository
```bash
git clone https://github.com/arielembeya223/free-project
cd free-project
Install PHP dependencies

bash

composer install


bash

npm install
Environment setup

bash

cp .env.example .env
php artisan key:generate
Database migration

bash

php artisan migrate
▶️ Running the Project
You need two terminals:

Terminal 1 — Laravel server
bash

php artisan serve
Terminal 2 — Vite / React
bash

npm run dev
Then open:

cpp

http://127.0.0.1:8000
🌍 Focus on Local Languages
LocalLingua is designed to:

Easily integrate new local languages

Support low-resource languages

Encourage community-driven language expansion

Local languages are a core priority, not an afterthought.

🛣️ Roadmap
 Voice translation (speech-to-text)

 Mobile application

 Partial offline support

 AI enhancements for low-resource languages

 Community contributions for new languages

🤝 Contributing
Contributions are welcome!

Fork the project

Create a feature branch (feature/my-feature)

Commit your changes

Open a Pull Request

📜 License
This project is free and open-source, released under the MIT License.

👤 Author
Ariel Embeya
Software Developer | Computer Science | Social Impact Technology

GitHub: https://github.com/arielembeya223
