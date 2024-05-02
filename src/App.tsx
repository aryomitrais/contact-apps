import './App.css';
import { BaseLayout } from './pages/common/BaseLayout';
import ContactListPage from './pages/contactList/ContactListPage';

function App() {
  return (
    <BaseLayout>
      <ContactListPage />
    </BaseLayout>
  );
}

export default App;
