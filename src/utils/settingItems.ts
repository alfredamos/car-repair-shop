export type NavLinkType = {
    href: string;
    label: string;
}

export const settingItems = [
    { href: '/change-password', label: 'Change Password' },
    { href: '/edit-profile', label: 'Edit Profile' },
    { href: '/', label: 'Home' },
    { href: '/refresh', label: 'Refresh' },
    { href: '/tickets', label: 'Tickets' },
];

export function getAllSettingItems(email: string) {
    return settingItems.map(item => {
        if (item.href === "/tickets" && item.label === "Tickets") {
            //----> Encode email
            const encodedEmail = encodeURIComponent(email);
            console.log("get-all-settings-items, encodedEmail : ", encodedEmail);
            return {
                href: `/tickets/get-tickets-by-email/${encodedEmail}`,
                label: item.label,

            } ;
        }
        return item;
    }) as NavLinkType[];
}
