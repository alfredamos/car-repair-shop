import { useState, useRef, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import Form from "next/form";
import {useAuthContext} from "@/hooks/useAuthContext";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {LocalStorageParam} from "@/utils/LocalStorageParam";
import {redirect } from "next/navigation";
import {UserSession} from "@/app/types/type";
import {refreshUserToken} from "@/app/actions/auth.action";


interface DropdownItemProps {
    href: string;
    children: ReactNode;
}

const DropdownItem = ({ href, children}: DropdownItemProps) => {
    const {setAuthSession : setUserResponse} = useAuthContext()
    const {setLocalStorage} = useLocalStorage<UserSession>()

    const isNotRefresh = href !== "/refresh";

    const refreshTokenOfUserAction = async () => {
        try {
        const response = await refreshUserToken();

        const storedResponse = response as unknown as UserSession;
        //----> Set both the auth-context and local-storage.
        setUserResponse(storedResponse);
        setLocalStorage(LocalStorageParam.authSession, storedResponse);

        } catch (error) {
            console.error(error); //----> Show toast for successful login.
        }finally{
            redirect("/");
        }
    }

    return(
        <>
            {isNotRefresh ? ( <Link
                href={href}
                className="block px-4 py-2 font-medium text-sm text-gray-700 hover:bg-gray-100"
            >
                {children}
            </Link>
                ) :
                (
                    <Form action={refreshTokenOfUserAction}>
                        <button type="submit" className="block px-4 py-2 font-medium text-sm text-gray-700 hover:bg-gray-100">Refresh</button>
                    </Form>)
            }
        </>
       )


}





//);

interface DropdownProps {
    title: string;
    items: Array<{ href: string; label: string }>;
}

const Dropdown = ({ title, items }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="flex items-center text-gray-700 hover:text-white hover:bg-black focus:outline-none  rounded-md px-3 py-2 text-sm font-medium"
            >
                {title}
                <ChevronDown className={`ml-2 h-4 w-4 transform ${isOpen ? 'rotate-180' : ''} transition-transform duration-200`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1">
                        {items.map((item) => (
                            <DropdownItem key={item.href} href={item.href}>
                                {item.label}
                            </DropdownItem>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
