import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { User } from './user.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {
  private readonly usersFile = path.join(process.cwd(), 'src', 'user', 'users.json');

  private readUsers(): User[] {
    try {
      const data = fs.readFileSync(this.usersFile, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading users file:', error);
      throw new InternalServerErrorException('Could not read users file');
    }
  }

  private writeUsers(users: User[]): void {
    try {
      fs.writeFileSync(this.usersFile, JSON.stringify(users, null, 2));
    } catch (error) {
      console.error('Error writing users file:', error);
      throw new InternalServerErrorException('Could not write users file');
    }
  }

  addUser(user: User): User {
    const users = this.readUsers();
    console.log(user);
    users.push(user);
    this.writeUsers(users);
    return user;
  }

  getUsers(): User[] {
    return this.readUsers();
  }
  update(id: any, updatedUser: User): void {
    const users = this.readUsers();
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    this.writeUsers(users);
  }

  remove(id: any): void {
    let users = this.readUsers();
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    users = users.filter(user => user.id !== id);
    this.writeUsers(users);
  }
}
