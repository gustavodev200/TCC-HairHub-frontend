"use client";

import { PageHeader } from "@/components/PageHeader";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Pagination } from "antd";
import { GenericStatus } from "@/@types/genericStatus";
import { categoryService } from "@/services/category";
import { CategoryOutputDTO } from "@/@types/category";
import { CategoryTable } from "./components/CategoryTable";
import { ModalCategory } from "./components/ModalCategory";

const Page: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<GenericStatus | "all">(
    "all"
  );

  const { data } = useQuery(["categories", page, statusFilter, search], {
    queryFn: () =>
      categoryService.getPaginated({
        filterByStatus: statusFilter !== "all" ? statusFilter : undefined,
        query: search,
        page,
      }),
    staleTime: Infinity,
  });

  const [categoryToEdit, setCategoryToEdit] = useState<CategoryOutputDTO>();
  const [showModalCategory, setShowModalCategory] = useState(false);

  const handleOpenModalCategory = (category?: CategoryOutputDTO) => {
    if (category) {
      setCategoryToEdit(category);
    }

    setShowModalCategory(true);
  };

  const handleCloseModalCategory = () => {
    setShowModalCategory(false);

    if (categoryToEdit) {
      setCategoryToEdit(undefined);
    }
  };

  return (
    <>
      <ModalCategory
        open={showModalCategory}
        categoryToEdit={categoryToEdit}
        onClose={handleCloseModalCategory}
      />

      <PageHeader
        pageTitle="Categorias"
        statusFilter={statusFilter}
        onChangeSearch={(value) => setSearch(value)}
        onChangeStatusFilter={(value) => setStatusFilter(value)}
        handleOpenModal={handleOpenModalCategory}
      />
      <CategoryTable
        categories={data?.data ?? []}
        onEdit={handleOpenModalCategory}
      />
      {data && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 24,
          }}
        >
          <Pagination
            hideOnSinglePage
            responsive
            current={page}
            total={data.totalPages * 10}
            onChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </>
  );
};

export default Page;
