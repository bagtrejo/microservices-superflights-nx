import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PassengerDTO } from './dto/passenger.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ClientProxySuperflights } from '../common/proxy/client-proxy';
import { IPassenger, PassengerMSG } from '@superflights/shared';


@ApiTags('Passengers')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/passenger')
export class PassengerController {
    constructor(private readonly clientProxy: ClientProxySuperflights){}

    private _clientProxyPassenger = this.clientProxy.clientProxyPassengers();

    @Post()
    create(@Body() passengerDTO: PassengerDTO): Observable<IPassenger>{
        return this._clientProxyPassenger.send(PassengerMSG.CREATE, passengerDTO);
    }

    @Get()
    findAll(): Observable<IPassenger[]>{
        return this._clientProxyPassenger.send(PassengerMSG.FIND_ALL, '');
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IPassenger>{
        return this._clientProxyPassenger.send(PassengerMSG.FIND_ONE, id);
    }

    @Put(':id')
    update(@Param('id') id:string, @Body() passengerDTO: PassengerDTO): Observable<IPassenger>{
        return this._clientProxyPassenger.send(PassengerMSG.UPDATE, {id, passengerDTO});
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any>{
        return this._clientProxyPassenger.send(PassengerMSG.DELETE, id);
    }
}
