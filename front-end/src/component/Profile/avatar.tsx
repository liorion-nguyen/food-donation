import avatarNone from "../../Images/profile/Avatar.png"
interface AvatarSmallProps {
    value: string;
    size: number;
}

const AvatarSmall: React.FC<AvatarSmallProps> = ({ value, size }) => {
    return <img src={value === '' || value === undefined ? avatarNone : value}
        style={{
            width: `${size}px`,
            height: `${size}px`,
            objectFit: 'cover',
            borderRadius: '50%',
        }} />
};

export default AvatarSmall;