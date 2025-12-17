"use client"

import {Customer} from "@prisma/client";
import {useRouter} from "next/navigation";
import axios from "axios";
import {Button} from "@/components/ui/button";

type Props = {
    customer: Customer;
}

export function ActiveOrInactiveActionButton({customer}: Props) {
    const router = useRouter();

    const activateOrDeactivateCustomer = async () => {
        await axios.patch(`/api/customers/customer-activate/${customer.id}`, {})
        router.push("/customers");

    }

    return (
        <Button variant="success" type="button" size="sm" className="m-2" onClick={activateOrDeactivateCustomer}>
            {customer.active ? "Inactive" : "Active"}
        </Button>
    );
}