import { useState } from "react";
import { RequestsTable } from "../sections/PrivateRequests/RequestsTable";

export const PrivateRequests = () => {

    return (
        <div className="">
            <h1 className="text-3xl text-(--primary-color) font-bold">SOL·LICITUDS</h1>

            <RequestsTable />
        </div>
    )
}