🩺 MedNexus


MedNexus bridges the gap between patients and pharmacies — helping users find,compare prices, order, or visit locations to purchase medications easily and securely.

⚡ Core Features
🔍 Smart Drug Search

Search drugs by name and location to get real-time results.
Examples:

Amoxicillin - FCT
Metformin - Lagos
Ibuprofen - Ogun
Paracetamol - Lagos


Results appear instantly with price, pharmacy, and location.

💊 Unified Drug View
🧾 Prescription Drugs

Show detailed info and provide:

📤 Upload prescription (image or PDF)

💬 Chat with pharmacy on WhatsApp

💡 Non-Prescription Drugs

Display full product info with:

🛒 Order Online

📍 Visit Pharmacy (opens Google Maps location)

Every drug view includes:

Drug name, price, and pack size

Pharmacy name, phone number, and location map link

👥 Authentication Flow

Access to order or prescription upload requires login.

🧑‍⚕️ Register Modal
Collects:

Full Name

Address

Phone Number

Email

Password

🔐 Login Modal
Email + Password → unlocks ordering or prescription upload

🏥 Pharmacy Dashboard

For pharmacies to:

View incoming orders

See client details (name, address, phone)

Call or text clients directly — no chat button needed

💬 WhatsApp Integration

Each pharmacy’s WhatsApp contact is linked to their registered phone number.
Patients can reach out instantly via a single click.

🧾 Mock Data Example
{
  id: 1,
  drug: "Amoxicillin",
  pharmacy: "MedPlus",
  price: 700,
  location: "FCT",
  packSize: "20 capsules",
  phone: "08123456789",
  requiresPrescription: true,
  image: "https://via.placeholder.com/240?text=Amoxicillin"
}

🧩 Tech Stack
Category	Tools Used
Frontend	React.js, Tailwind CSS, Framer Motion, Lucide Icons
Backend (Planned)	Node.js, Express.js, MongoDB, JWT
Deployment	Netlify / Render
Integrations	Google Maps, WhatsApp API
⚙️ Setup & Run Locally
# Clone repository
git clone https://github.com/yourusername/mednexus.git

# Enter directory
cd mednexus

# Install dependencies
npm install

# Start development server
npm run dev


App runs locally on ➜ http://localhost:5173

🚀 Roadmap

✅ Frontend MVP (Search + Modals + Pharmacy Dashboard)

🔄 Backend authentication & order API

💳 Payment integration

📍 Real-time pharmacy locator

🧾 Verified pharmacy badges

📦 Pharmacy inventory management

📬 Contact

Project: MedNexus
Developer: Ighedosa Promise
📧 Email: yourname@email.com

🌐 GitHub: github.com/yourusername