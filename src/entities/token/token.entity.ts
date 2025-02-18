import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { User } from '../user/User.entity';
import { CommonEntity } from '../common/CommonSchema.entity';
import { TokenEnum } from '../../constants/appConstants';
import { Admin } from '../admin/admin.entity';

@Entity('token')
@Unique(['user', 'type'])
@Unique(['admin', 'type'])
export class Token extends CommonEntity {
    @Column({
        nullable: false,
    })
    token: string;

    @Column({
        type: 'enum',
        enum: TokenEnum,
        nullable: false,
    })
    type: TokenEnum;

    @ManyToOne(() => User, (user) => user.token, {
        onDelete: 'CASCADE',
        cascade: true,
    })
    user: User;

    @ManyToOne(() => Admin, (admin) => admin.token, {
        onDelete: 'CASCADE',
        cascade: true,
    })
    @JoinColumn({ name: 'admin' })
    admin: Admin;
}
