from flask import Flask, jsonify
from flask_cors import CORS  # Agrega la importación de CORS
import psutil
import platform

app = Flask(__name__)
CORS(app)  # Habilita CORS para la aplicación


# Funciones auxiliares
def obtener_info_procesos():
    process_info = []
    for process in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_info']):
        memory_mb = process.info['memory_info'].rss / (1024 ** 2)  # Convertir bytes a megabytes
        process_info.append({
            'cpu': round(process.info['cpu_percent'], 2),
            'id': process.info['pid'],
            'memory': round(memory_mb, 2),
            'name': process.info['name']
        })
    return process_info


@app.route('/procesos')
def procesos_route():
    process_info = obtener_info_procesos()

    # Obtener la información necesaria para total_cpu y total_memory
    cpu_percent = min(psutil.cpu_percent(), 100)
    memory_percent = min(psutil.virtual_memory().percent, 100)

    combined_data = {
        'total_cpu': round(cpu_percent, 2),
        'total_memory': round(memory_percent, 2),
        'process_arary': process_info

    }

    return jsonify(combined_data)



@app.route('/servicios')
def servicios():
    if platform.system() == 'Windows':
        servicios_info = obtener_info_servicios_windows()
    else:
        servicios_info = obtener_info_servicios_linux()
    return jsonify(servicios_info)



@app.route('/cpu')
def cpu():
    cpu_percent = min(psutil.cpu_percent(), 100)
    cpu_cores = psutil.cpu_count()
    cpu_frequencies = psutil.cpu_freq(percpu=True)

    return jsonify({
        'cpu_percent': cpu_percent,
        'cpu_cores': cpu_cores,
        'cpu_usage_per_core': [{'core': i, 'usage_percent': percent} for i, percent in enumerate(psutil.cpu_percent(percpu=True))]
    })
    
    
def bytes_to_gb(bytes_value):
    return round(bytes_value / (1024 ** 3), 2)  # Convertir bytes a gigabytes y redondear a 2 decimales


@app.route('/disco_memoria')
def disco_memoria():
    memory_info = psutil.virtual_memory()
    swap_info = psutil.swap_memory()
    disk_io = psutil.disk_io_counters()

    partitions_info = []
    for partition in psutil.disk_partitions():
        partition_info = {
            'mountpoint': partition.mountpoint,
            'device': partition.device,
            'fstype': partition.fstype,
            'total_gb': bytes_to_gb(psutil.disk_usage(partition.mountpoint).total),
            'used_gb': bytes_to_gb(psutil.disk_usage(partition.mountpoint).used),
            'free_gb': bytes_to_gb(psutil.disk_usage(partition.mountpoint).free),
            'percent': psutil.disk_usage(partition.mountpoint).percent
        }
        partitions_info.append(partition_info)

    return jsonify({
        'memory_percent': min(memory_info.percent, 100),
        'memory_used_gb': bytes_to_gb(memory_info.used),
        'memory_available_gb': bytes_to_gb(memory_info.available),
        'partitions': partitions_info,
        'read_gb': bytes_to_gb(disk_io.read_bytes),
        'write_gb': bytes_to_gb(disk_io.write_bytes),
        'swap_percent': swap_info.percent,
        'swap_used_gb': bytes_to_gb(swap_info.used),
        'swap_total_gb': bytes_to_gb(swap_info.total)
    })

def obtener_info_servicios_windows():
    servicios_info = []
    for service in psutil.win_service_iter():
        servicio_info = {
            'nombre': service.name(),
            'desc': service.description(),
            'estado': service.status(),
            'inicio': service.start_type(),
        }

        # Verificar si el servicio tiene un proceso asociado (pid)
        try:
            servicio_info['pid'] = service.pid()
        except psutil.NoSuchProcess:
            servicio_info['pid'] = None

        servicios_info.append(servicio_info)

    return servicios_info

def obtener_info_servicios_linux():
    servicios_info = []
    for service in psutil.process_iter(['name', 'status', 'username']):
        if service.info['username'] == 'root':
            servicio_info = {
                'nombre': service.info['name'],
                'estado': service.info['status'],
                'desc': "Descripción no disponible",  # Agrega la función para obtener la descripción
                'inicio': None  # Agrega la lógica necesaria para obtener el tipo de inicio en Linux si es necesario
            }

            # Verificar si el servicio tiene un proceso asociado (pid)
            try:
                servicio_info['pid'] = service.pid
            except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
                servicio_info['pid'] = None

            servicios_info.append(servicio_info)
    return servicios_info

if __name__=='__main__':
    app.run(debug=True)