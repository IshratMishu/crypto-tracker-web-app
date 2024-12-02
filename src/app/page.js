import CryptoTable from "@/Components/CryptoTable";
import Filter from "@/Components/Filter";


export default function Home() {
  return (
    <div>
      <main>
        <Filter></Filter>
        <CryptoTable></CryptoTable>
      </main>
    </div>
  );
}
