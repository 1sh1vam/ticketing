import Link from 'next/link';

export default ({ currentUser }) => {
    const links = [
        !currentUser && {href: '/auth/signup', label: 'Sign up'},
        !currentUser && {href: '/auth/signin', label: 'Sign in'},
        currentUser && {href: '/auth/signout', label: 'Sign out'},
    ].filter((link) => link)
    .map(({ href, label }) => (
        <Link href={href} key={href}>
            <a className="mr-2 decoration-0 px-3 py-1 border border-indigo-500 rounded-md last-of-type:mr-0">{label}</a>
        </Link>
    ))

    return (
        <div className="box-border w-full flex mb-5 justify-between items-center">
            <h3 className="text-gray text-xl border px-2 py-1 rounded-md">YTick</h3>
            <div className="flex items-center">
                {links}
            </div>
        </div>
    )
}