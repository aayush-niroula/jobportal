"use client";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  page: number;
  totalPages: number;
}

const Pagination = ({ page, totalPages }: Props) => {
  const router = useRouter();
  const params = useSearchParams();

  const changePage = (newPage: number) => {
    const p = new URLSearchParams(params.toString());
    p.set("page", String(newPage));
    router.push(`?${p.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-3 mt-6">
      <Button
        variant="outline"
        disabled={page === 1}
        onClick={() => changePage(page - 1)}
      >
        Prev
      </Button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1;
        return (
          <Button
            key={p}
            variant={p === page ? "default" : "outline"}
            onClick={() => changePage(p)}
          >
            {p}
          </Button>
        );
      })}

      <Button
        variant="outline"
        disabled={page === totalPages}
        onClick={() => changePage(page + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
