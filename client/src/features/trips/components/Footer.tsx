export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-white text-center p-6">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Voayagr. All rights reserved.</p>
      </div>
    </footer>
  );
}