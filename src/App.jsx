import { useState} from "react";
import Login from "./components/Login";
import Calendar from "./components/Calendar";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      {user ? (
        <Calendar username={user} />
      ) : (
        <Login onLogin={setUser} />
      )}
    </div>
  );
}

  