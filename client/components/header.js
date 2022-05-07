import Link from 'next/link';

export default ({ currentUser }) => {
    const links = [
        currentUser && { href: '/tickets/new', label: 'Sell Tickets' },
        currentUser && { href: '/orders', label: 'My Orders' },
        !currentUser && {href: '/auth/signup', label: 'Sign up'},
        !currentUser && {href: '/auth/signin', label: 'Sign in'},
        currentUser && {href: '/auth/signout', label: 'Sign out'},
    ].filter((link) => link)
    .map(({ href, label }) => (
        <Link href={href} key={href}>
            <a className="mr-4 text-sm text-blue-400 decoration-0 py-1 borde rounded-md last-of-type:mr-0">{label}</a>
        </Link>
    ))

    return (
        <div className="box-border w-full flex mb-5 justify-between items-center">
            <Link href="/">
                <a className="text-gray decoration-0 text-xl border px-2 py-1 rounded-md">YTick</a>
            </Link>
            <div className="flex items-center px-5">
                {links}
            </div>
        </div>
    )
}