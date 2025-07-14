import { useAuth } from '@/provider/authProvider';
import { Navigate } from 'react-router-dom';

export default function ParticipantProfile(){

    const {user } = useAuth();
    if(!user){
        return <Navigate to="/login" replace />;
    }

    return <>
        <div className="my-6 w-full overflow-y-auto">
            <table className="w-full">
                <tbody>
                <tr className="even:bg-muted m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    id
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    {user.id}
                    </td>
                </tr>
                <tr className="even:bg-muted m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    nom
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    {user.nom} {user.prenom}
                    </td>
                </tr>
                <tr className="even:bg-muted m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    email
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    {user.email}
                    </td>
                </tr>
                <tr className="even:bg-muted m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    telephone
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    {user.telephone}
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
    </>

}