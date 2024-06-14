import CategoryList from "../../../components/category";

async function getAllListsByCategory(getId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/category?categoryID=${getId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    if (data.success) {
      return data.data;
    } else {
      throw new Error(`API error! message: ${data.message}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export default async function Category({ params }: { params: any }) {
  const { id } = params;

  const getAllList = await getAllListsByCategory(id);

  return <CategoryList list={getAllList} />;
}
