import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  private readonly logger = new Logger(PlayersService.name);

  createPlayer(player: Player): Promise<Player> {
    return this.playerModel.create(player);
  }

  searchPlayer(email: string): Promise<Player[]> {
    const query = email ? { email } : null;
    return this.playerModel.find(query);
  }

  updatePlayer(id: string, player: Player): Promise<Player> {
    return this.playerModel.findByIdAndUpdate(id, player, { new: true });
  }

  async getPlayer(id: string): Promise<Player> {
    const result = await this.playerModel.findById(id);
    if (!result) throw new NotFoundException(`Player ${id} not found!`);

    return result;
  }

  async deletePlayer(id: string) {
    await this.playerModel.findByIdAndDelete(id);
  }
}
